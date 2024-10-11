<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'sg_users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'lastname',
        'email',
        'phone',
        'password',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Recupera le associazioni tra utenti e ruoli.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany<\App\Models\Role>
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'sg_role_user');
    }

    /**
     * Recupera le associazioni tra utenti e permessi.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany<\App\Models\Permission>
     */
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'sg_permission_user');
    }

    /**
     * Assegna un ruolo all'utente.
     *
     * @param mixed $role Il ruolo da assegnare. Pu  essere un'istanza di Role o il nome del ruolo.
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function assignRole($role)
    {
        return $this->roles()->attach($role);
    }

    /**
     * Verifica se l'utente ha il ruolo specificato.
     *
     * @param string $role Il nome del ruolo da verificare.
     * @return bool True se l'utente ha il ruolo, false altrimenti.
     */
    public function hasRole($role)
    {
        return $this->roles()->where('name', $role)->exists();
    }

    /**
     * Verifica se l'utente ha il permesso specificato.
     *
     * Il metodo verifica se l'utente ha il permesso assegnato tramite uno dei ruoli assegnati
     * o se l'utente ha il permesso assegnato direttamente.
     *
     * @param string $permission Il nome del permesso da verificare.
     * @return bool True se l'utente ha il permesso, false altrimenti.
     */
    public function hasPermission($permission)
    {
        // Controlla i permessi assegnati tramite i ruoli
        if ($this->roles()->whereHas('permissions', function ($query) use ($permission) {
            $query->where('name', $permission);
        })->exists()) {
            return true;
        }

        // Se assegni permessi direttamente agli utenti
        if ($this->permissions()->where('name', $permission)->exists()) {
            return true;
        }

        return false;
    }

    /**
     * Restituisce la lista dei permessi dell'utente, incluse
     * le autorizzazioni assegnate tramite i ruoli.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getAllPermissions()
    {
        // Permessi di ruolo
        $rolePermissions = $this->roles()
            ->with('permissions')
            ->get()
            ->pluck('permissions')
            ->flatten()
            ->pluck('name')
            ->unique();

        // Permessi utente
        $directPermissions = $this->permissions()->pluck('name');

        // Permessi totali = permessi di ruolo + permessi utente
        return $rolePermissions->merge($directPermissions)->unique()->values();
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    protected $table = 'sg_roles';
    protected $fillable = ['name', 'label'];

    /**
     * The users that belong to the Role
     *
     * @return BelongsToMany
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'sg_role_user');
    }

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'sg_permission_role');
    }
}

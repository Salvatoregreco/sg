<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'sg_roles';
    protected $fillable = ['name', 'label'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'sg_role_user');
    }

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'sg_permission_role');
    }
}

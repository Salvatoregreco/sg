<?php

namespace App\Models;

use App\Models\Submodules;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Modules extends Model
{
    use SoftDeletes;

    protected $table = 'sg_modules';

    protected $fillable = [
        'module',
        'label',
        'icon',
        'base_path',
        'status',
        'position'
    ];

    // Relazione con i sottomoduli
    public function submodules()
    {
        return $this->hasMany(Submodules::class, 'module_id', 'id')
            ->where('status', 'online')
            ->orderBy('position', 'ASC');
    }
}

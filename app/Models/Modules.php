<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
}

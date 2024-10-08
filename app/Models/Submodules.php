<?php

// app/Models/Submodule.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Submodules extends Model
{
    use SoftDeletes;

    protected $table = 'sg_submodules';

    protected $fillable = [
        'module_id',
        'label',
        'path',
        'status',
        'position',
    ];

    // Relazione inversa con il modulo
    public function module()
    {
        return $this->belongsTo(Modules::class, 'module_id', 'id');
    }
}

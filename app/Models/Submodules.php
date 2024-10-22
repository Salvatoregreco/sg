<?php

namespace App\Models;

use App\Casts\StatusCast;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
        'permission_name',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime:Y-m-d H:i:s',
            'updated_at' => 'datetime:Y-m-d H:i:s',
            'deleted_at' => 'datetime:Y-m-d H:i:s',
            'status' => StatusCast::class,
        ];
    }

    /**
     * Get the module that owns the submodule.
     *
     * @return BelongsTo
     */
    public function module(): BelongsTo
    {
        return $this->belongsTo(Modules::class, 'module_id', 'id');
    }
}

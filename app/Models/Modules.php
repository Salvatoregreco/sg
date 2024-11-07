<?php

namespace App\Models;

use App\Casts\StatusCast;
use App\Models\Submodules;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Modules extends Model
{
    use SoftDeletes;

    protected $table = 'sg_modules';

    protected $fillable = [
        'name',
        'label',
        'icon',
        'base_path',
        'status',
        'position',
        'permission_name',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
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
     * Get the submodules that belong to the module.
     *
     * @return HasMany
     */
    public function submodules(): HasMany
    {
        return $this->hasMany(Submodules::class, 'module_id', 'id')
            ->where('status', 'Y')
            ->orderBy('position', 'ASC');
    }
}

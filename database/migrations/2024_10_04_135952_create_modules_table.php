<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('modules', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('label');
            $table->string('icon')->nullable();
            $table->string('base_path');
            $table->enum('status', ['N', 'Y'])->default('N');
            $table->integer('position')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->timestamp('deleted_at')->nullable();
        });

        Schema::create('submodules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('module_id');
            $table->string('label');
            $table->string('path');
            $table->enum('status', ['N', 'Y'])->default('N');
            $table->integer('position')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->timestamp('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modules');
        Schema::dropIfExists('submodules');
    }
};

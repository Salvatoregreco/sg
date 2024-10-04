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
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content')->nullable();
            $table->enum('status', ['N', 'Y'])->default('N');
            $table->foreignId('user_id');
            $table->string('seo_title')->nullable();
            $table->string('seo_description')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->timestamp('deleted_at')->nullable();
        });

        Schema::create('blog_categorys', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->text('seo_title')->nullable();
            $table->string('seo_description')->nullable();
            $table->enum('status', ['N', 'Y'])->default('N');
            $table->bigInteger('parent')->nullable();
            $table->integer('lv')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->timestamp('deleted_at')->nullable();
        });

        Schema::create('blog_authors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('lastname');
            $table->string('slug');
            $table->text('seo_title')->nullable();
            $table->string('seo_description')->nullable();
            $table->enum('status', ['N', 'Y'])->default('N');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->timestamp('deleted_at')->nullable();
        });

        Schema::create('blog_tags', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->enum('status', ['N', 'Y'])->default('N');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->timestamp('deleted_at')->nullable();
        });

        Schema::create('blog_post_tags', function (Blueprint $table) {
            $table->foreignId('post_id');
            $table->foreignId('tag_id');
        });

        Schema::create('blog_post_categorys', function (Blueprint $table) {
            $table->foreignId('post_id');
            $table->foreignId('category_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
        Schema::dropIfExists('blog_categorys');
        Schema::dropIfExists('blog_authors');
        Schema::dropIfExists('blog_tags');
        Schema::dropIfExists('blog_post_tags');
        Schema::dropIfExists('blog_post_categorys');
    }
};

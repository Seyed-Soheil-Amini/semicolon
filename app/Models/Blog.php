<?php

namespace App\Models;

use App\Enums\BlogStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Blog extends Model
{
    protected $fillable = [
        'title',
        'body',
        'image',
        'labels',
        'status',
        'published_at',
        'user_id',
        'category_id',
        'like',
        'likkers',
        'view',
        'viewers',
    ];

    protected $casts = ['labels' => 'array', 'status' => BlogStatusEnum::class];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}

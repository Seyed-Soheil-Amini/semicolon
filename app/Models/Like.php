<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $fillable = ['blog_id','ip_address'];
    public $timestamps = false;

    public function blog(): BelongsTo
    {
        return $this->belongsTo(Blog::class);
    }
    
    use HasFactory;
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MailBox extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'total',
        'sent',
        'received',
        'read',
        'unread',
        'created_at',
        'updated_at'
    ];

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function mails():HasMany
    {
        return $this->hasMany(Mail::class);
    }
}

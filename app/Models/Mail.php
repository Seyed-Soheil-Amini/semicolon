<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Mail extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'mail_box_id',
        'title',
        'sender_name',
        'data',
        'text',
        'isRead',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'data' => 'array'
    ];
    public function mailbox(): BelongsTo
    {
        return $this->belongsTo(MailBox::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sender_name', 'name');
    }
}

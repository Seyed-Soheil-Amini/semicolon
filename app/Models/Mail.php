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
        'text',
        'isRead',
        'created_at',
        'updated_at'
    ];

    public function mailbox(): BelongsTo
    {
        return $this->belongsTo(MailBox::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'isAdmin',
        'isSuperAdmin',
        'isStaff',
        'image',
        'job_title',
        'about',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function __toString()
    {
        $data = [
            'name' => $this->name,
            'email' => $this->email,
            'isAdmin' => $this->isAdmin,
            'isSuperAdmin' => $this->isSuperAdmin,
            'isStaff' => $this->isStaff,
            'image' => $this->image,
            'job_title' => $this->job_title,
            'about' => $this->about
        ];
        return json_encode($data);
    }

    public function blogs()
    {
        return $this->hasMany(Blog::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function staff(): HasOne
    {
        return $this->hasOne(Staff::class);
    }

    public function mailbox(): HasOne
    {
        return $this->hasOne(MailBox::class);
    }

    use HasApiTokens;
}

import { Link } from '@inertiajs/react';

export default function BlogLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-indigo-400 dark:border-indigo-600 focus:border-indigo-700 '
                    : 'border-transparent') +
                className
            }
        >
            {children}
        </Link>
    );
}

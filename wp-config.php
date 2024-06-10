<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'klubdenver' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '`MN?oK]9a`lFzB~%$n::L}Q:mzKkR9lG~D|<J!^A^pNfTIB|c06R6-1,]A!UFN8G' );
define( 'SECURE_AUTH_KEY',  'h;(N.hu*WWZ?mS(zky7a/`+ewTsQ:n0@`YXCN;-A[/uFgwc gEk@Ik7Mogf426(b' );
define( 'LOGGED_IN_KEY',    '3e2-ht`;9y{l,({!A3ABJ$m%Ys?@Of,-V(n,H_Yycxq|[S<MAsBi}>Nbg_.6+)cG' );
define( 'NONCE_KEY',        'ib&8-E:.bSuCudn-15h=.<K/R9W?P^WKB1Sb,Qqg_(ccZg0Rd:AhcvrMYnB>0NlI' );
define( 'AUTH_SALT',        '>^6trm~l61lAf8,K)ToM%|bt<6m>de_I_C(Z_F?!}c0$;PW>CKnu?&S07Qr`z5[e' );
define( 'SECURE_AUTH_SALT', '9:XkB#!T}@Jsbf-k!3,&=jTBmF PgdMOj*A S#CAhlmZ*3t_Fo>$w`4r h,JeCTW' );
define( 'LOGGED_IN_SALT',   '`MblQ6F#kC*WGo-8`!f`(c5og%Hv!@4?heHH`B!8[Fb`q>wiT/RilmolB5htb}W^' );
define( 'NONCE_SALT',       ')>Pey/i%W(t{IFmnY1RuIQ_lvQ8q6p~~09VqA|Wb1+aNsxSFURX{*uHoBk$>;yS8' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

  /**
   * if the domain where we're currently running this address is fictional-university.local
   * then we use the dev url
   * else we are using the public uri optimized for the public 
   */
  if (strstr($_SERVER['SERVER_NAME'],'fictional-university.local')) {
    // ** MySQL settings - local ** //
    /** The name of the database for WordPress */
    define( 'DB_NAME', 'local' );
    
    /** MySQL database username */
    define( 'DB_USER', 'root' );
    
    /** MySQL database password */
    define( 'DB_PASSWORD', 'root' );
    
    /** MySQL hostname */
    define( 'DB_HOST', 'localhost' );

  } else {
    // ** MySQL settings - web host ** //
    /** The name of the database for WordPress */
    define( 'DB_NAME', 'dbam8xgiuho1yg' );
    
    /** MySQL database username */
    define( 'DB_USER', 'ueje2psekq3b3' );
    
    /** MySQL database password */
    define( 'DB_PASSWORD', 'Morgunstund gefur wordpress i mund #1' );
    
    /** MySQL hostname */
    define( 'DB_HOST', '127.0.0.1' );
  }


/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'UE1zZXplwpcNJle7WZQcfrTYNNNbCA5hmHJbn0i21DNiJF/uBYLKFAJPzShghti+Vq3fa5pA2U4qYuHHgCpUPw==');
define('SECURE_AUTH_KEY',  'XTM268AtOd/qVf8XqfEYukV59uXlhp5b/Ilvjsv8doNHUXJkI07y7tzFm4hrZUkCp2w1v9IDCdFh5mmC8byWzA==');
define('LOGGED_IN_KEY',    'n3fZ613KYtMh6SZlG8suD407smftgcTn1R45ZElGJouFRjYUbFR8zNYFEQ1A1B+foFQoNnc7ZH6cCaAaRG5xCA==');
define('NONCE_KEY',        'baGk0Yg8NC6B6AFapHvMKPZxp9Q4AKPexPHrtpXKxVDB3iLGOvJsz5QuEfwjmPEzXumIVgDU52XfgF2yrR/EAQ==');
define('AUTH_SALT',        'MHdOY6UkByy8qE5JBA/pzmxUG/LfjbORJkrg0jZtcBRMzMa+KLuz4uJi9MtXY86WG2A7PtydsML+7DS4Ur81Qw==');
define('SECURE_AUTH_SALT', 'CUPJ0tm/MZEr4xwUCNCHLpFPUpZ9rfqvk6vcSTyj4dBP5FEN//Ypi0IJbWR1NVjoMh3dWggKGtllGM24TozFJA==');
define('LOGGED_IN_SALT',   'oHysXvX+SD0855w6SzfKxiUMtNTCh6lD1WmuNMdtlrdgBs6NiKndpHtIYHvZWBRY0InNYnWIIJFFIiFIOs1/8A==');
define('NONCE_SALT',       '2v1x5BVPnxX7AojYaxcR+Qk1s+6/W71yT4w5qUQIqRxWxIILW4ZY0ZN6HxADZ5itbO5hiZ3fOBhHPqmqyYpeoQ==');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';




/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

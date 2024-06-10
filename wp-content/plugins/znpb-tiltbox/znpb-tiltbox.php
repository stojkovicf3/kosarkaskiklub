<?php

/**
 * Plugin Name: ZNPB TiltBox Element
 * Plugin URI: http://hogash.com
 * Description: This plugin will generate an animated tilting box for Kallyas Page builder.
 * Version: 1.0.2
 * Author: Hogash Studio
 * Author URI: http://hogash.com
 * License: GPL2
 */


defined('ABSPATH') or die('No script kiddies please!');

class ZnPbTiltBoxElement
{

    /**
     * Holds the plugin current version
     * @var string
     */
    public $version = '1.0.2';

    /**
     * Holds the plugin url
     * @var string
     */
    public $url = '';

    /**
     * Holds the plugin path
     * @var string
     */
    public $path = '';


    /**
     * Holds a refference of the class instance
     */
    public static $instance = null;


    /**
     * Returns an instance of the classs
     * @return [type] [description]
     */
    public static function get_instance()
    {
        if (null === self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }


    /**
     * Main class constructor
     */
    public function __construct()
    {

        // Set plugin paths
        $this->url     = plugin_dir_url(__FILE__);
        $this->path    = plugin_dir_path(__FILE__);

        add_action('after_setup_theme', array( $this, 'init_plugin' ));
        add_filter('zn_pb_dirs', array( $this, 'register_elements_dir' ));
        load_plugin_textdomain('znpb-tiltbox-element', false, basename(dirname(__FILE__)) . '/languages');
    }


    /**
     * Fire up the plugin or show a notice in case Kallyas theme is not installed
     */
    public function init_plugin()
    {
        if (! function_exists('ZNPB')) {
            add_action('admin_notices', array( $this, 'show_admin_notice' ));
        }
    }


    /**
     * Shows an admin notice telling you that the Kallyas theme is not installed.
     */
    public function show_admin_notice()
    {
        $class = 'notice notice-error is-dismissible';
        $buy_kallyas_url = 'https://themeforest.net/item/kallyas-responsive-multipurpose-wordpress-theme/4091658';
        $buy_link = sprintf('<a class="button button button-primary" href="%1$s" target="_blank">%2$s</a>', $buy_kallyas_url, __('Get Kallyas theme from here', 'znpb-tiltbox-element'));
        $message = __('Kallyas theme is not installed! TiltBox Element only works with Kallyas theme.', 'znpb-tiltbox-element');

        printf('<div class="%1$s"><p>%2$s</p><p>%3$s</p></div>', $class, $message, $buy_link);
    }


    /**
     * Add the path to our elements folder
     * @param  array $dirs the folders that were already loaded
     * @return array       the complete folders list
     */
    public function register_elements_dir($dirs)
    {
        $dirs[] = array(
            'url' => trailingslashit($this->url .'elements'),
            'path' => trailingslashit($this->path .'elements'),
        );

        return $dirs;
    }
}
ZnPbTiltBoxElement::get_instance();

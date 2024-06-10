<?php

namespace Hogash\Kallyas;

if ( ! defined( 'ABSPATH' ) ) {
	return;
}

class Plugins {
	const DAYS_TO_CACHE = 30;

	public function __construct() {
		add_action( 'dash_clear_cached_data', array( __CLASS__, 'delete_plugins_list' ), 0 );
	}

	public static function get_cache_key( $prefix = '' ) {
		$theme = Kallyas::get_instance();
		return $theme->get_theme_id() . '_' . $prefix;
	}

	/**
	 * Returns a cached list of plugins
	 *
	 * @param boolean $force If we need to refresh the list of plugins from the server
	 * @return array The list of plugins
	 */
	public static function get_plugins_list() {
		$cache_key      = self::get_cache_key( 'plugins_list' );
		$cached_plugins = get_transient( $cache_key );

		// If we don't have the list of plugins in the cache, we need to get it from the server
		if ( false === $cached_plugins ) {
			$plugins_from_server = kallyas()->server_api->get_plugins_list();

			if ( is_wp_error( $plugins_from_server ) ) {
				// Save empty list of plugins in case of server error. The user will have to refresh the list of plugins manually
				self::save_plugins_list( [] );
				return [];
			} else {
				self::save_plugins_list( $plugins_from_server );
				return $plugins_from_server;
			}
		}

		return $cached_plugins;
	}

	/**
	 * Save the list of plugins in the cache
	 *
	 * @param array $plugins The list of plugins
	 */
	public static function save_plugins_list( $plugins ) {
		$cache_key = self::get_cache_key( 'plugins_list' );
		set_transient( $cache_key, $plugins, self::DAYS_TO_CACHE * DAY_IN_SECONDS );
	}

	/**
	 * Delete the list of plugins from the cache
	 */
	public static function delete_plugins_list() {
		$cache_key = self::get_cache_key( 'plugins_list' );
		delete_transient( $cache_key );
	}
}

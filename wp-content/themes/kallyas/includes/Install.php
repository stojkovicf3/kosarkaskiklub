<?php

namespace Hogash\Kallyas;

if ( ! defined( 'ABSPATH' ) ) {
	return;
}

class Install {
	public function __construct() {
		// Theme activation
		add_action( 'after_switch_theme', array( $this, 'redirect_to_dashboard' ) );
	}

	public function redirect_to_dashboard() {
		// Holds the url to which the user is redirected when first installing the theme
		$install_url = apply_filters( 'znhgtfw_install_url_redirect', ZNHGTFW()->getComponent( 'utility' )->get_options_page_url() );
		// Redirect the user to the Theme Dashboard
		wp_redirect( $install_url );
	}
}

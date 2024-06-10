<?php 

use Hogash\Kallyas\License;

if(! defined('ABSPATH')){ return; }

if( License::get_managed_license_key() ){
	?>
	<div class="inline notice notice-success">
		<p>
			<?php esc_html_e('Theme license is managed by the server administrator.', 'zn_framework'); ?>
		</p>
	</div>
	<?php
}
else {
	include( ZNHGTFW()->getFwPath( 'inc/admin/tmpl/form-register-theme-tmpl.php' ));
}

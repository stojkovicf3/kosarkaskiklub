(function() {
  "use strict";
  let GutenbergIntegration = {
    init() {
      let self = this;
      wp.data.subscribe(() => {
        setTimeout(() => {
          self.addButtons();
        }, 100);
      });
    },
    addButtons() {
      var _a;
      const buttonWrapperMarkup = (_a = document.getElementById(
        "zionbuilder-gutenberg-panel"
      )) == null ? void 0 : _a.innerHTML;
      const editorHeader = document.querySelector(".edit-post-header-toolbar");
      if (editorHeader && !editorHeader.querySelector(".zn_pb_buttons")) {
        editorHeader.insertAdjacentHTML("beforeend", buttonWrapperMarkup);
      }
    }
  };
  GutenbergIntegration.init();
})();

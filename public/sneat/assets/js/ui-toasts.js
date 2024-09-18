/**
 * UI Toasts
 */

'use strict';

(function () {
    // Bootstrap toasts example
    // --------------------------------------------------------------------
    const toastPlacementExample = document.querySelector('.toast-placement-ex'),
        toastPlacementBtn = document.querySelector('#showToastPlacement');
    let selectedType, selectedPlacement, toastPlacement;

    // Dispose toast when open another
    function toastDispose(toast) {
        if (toast && toast._element !== null) {
            if (toastPlacementExample) {
                toastPlacementExample.classList.remove(selectedType);
                DOMTokenList.prototype.remove.apply(toastPlacementExample.classList, selectedPlacement);
            }
            toast.dispose();
        }
    }
    // Placement Button click
    if (toastPlacementBtn) {
        toastPlacementBtn.onclick = function () {
            if (toastPlacement) {
                toastDispose(toastPlacement);
            }
            // selectedType = document.querySelector('#selectTypeOpt').value;
            selectedType = 'bg-success';
            // selectedPlacement = document.querySelector('#selectPlacement').value.split(' ');
            selectedPlacement = 'top-0 end-0'.split(' ');

            toastPlacementExample.classList.add(selectedType);
            DOMTokenList.prototype.add.apply(toastPlacementExample.classList, selectedPlacement);
            toastPlacement = new bootstrap.Toast(toastPlacementExample);
            toastPlacement.show();
        };
    }
})();

function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    var sidebarLinks = document.querySelectorAll('.sidebar-link');
    var sidebarSearch = document.getElementById('sidebar-search');
    var toggleIcon = document.getElementById('toggle-icon');

    if (sidebar.style.width === "350px" || sidebar.style.width === "100%") {
        sidebar.style.width = "0";
        sidebarLinks.forEach(function(link) {
            link.style.display = "none";
        });
        sidebarSearch.style.display = 'none';
        toggleIcon.classList.replace('fa-x', 'fa-bars');
    } else {
        sidebar.style.width = window.innerWidth <= 768 ? "100%" : "350px";
        sidebarLinks.forEach(function(link) {
            link.style.display = "block";
        });
        sidebarSearch.style.display = 'block';
        toggleIcon.classList.replace('fa-bars', 'fa-x');
    }
}

window.addEventListener('resize', function() {
    var searchInput = document.querySelector('.search-sidebar input');
    var toggleIcon = document.getElementById('toggle-icon');
    if (window.innerWidth <= 768 && document.activeElement !== searchInput) {
        var sidebar = document.getElementById("sidebar");
        var sidebarLinks = document.querySelectorAll('.sidebar-link');

        sidebar.style.width = "0";
        sidebarLinks.forEach(function(link) {
            link.style.display = "none";
        });
        toggleIcon.classList.replace('fa-x', 'fa-bars');
    }
});

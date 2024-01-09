<?php

/**
 * Theme routes.
 *
 * The routes defined inside your theme override any similar routes
 * defined on the application global scope.
 */
Route::any('/', function () {
    return view('pages.front');
});
Route::any('page', function () {
    return view('pages.default');
});
Route::any('single', function () {
    return view('blog.single');
});
Route::any('archive', function () {
    return view('blog.archive');
});
Route::any('category', function () {
    return view('blog.archive');
});
Route::any('tag', function () {
    return view('blog.archive');
});
Route::any('search', function () {
    return view('pages.search');
});




// Route::any('404', function () {
//     return view('pages.default');
// });
Route::fallback(function () {
    return view('errors.404');
});

(function($) {
    var $form = $('#ajax-search-form'),
        $input = $form.find(':text');
    $form.append('<div id="search-result"></div>');
    var $result_container = $('#search-result');
    $form.on("submit", function() {
        var keyword = $input.val();
        $result_container.show().html('Loading...');
        $.ajax({
            url: 'http://nama_blog.blogspot.com/feeds/posts/summary?alt=json-in-script&q=' + keyword + '&max-results=9999',
            type: 'get',
            dataType: 'jsonp',
            success: function(json) {
                var entry = json.feed.entry,
                    link, skeleton = "";
                if (typeof entry !== "undefined") {
                    skeleton = '<h4>Search results for keyword &quot;' + keyword + '&quot;</h4>';
                    skeleton += '<a class="close" href="/">&times;</a><ol>';
                    for (var i = 0; i < entry.length; i++) {
                        for (var j = 0; j < entry[i].link.length; j++) {
                            if (entry[i].link[j].rel == "alternate") {
                                link = entry[i].link[j].href;
                            }
                        }
                        skeleton += '<li><a href="' + link + '">' + entry[i].title.$t + '</a></li>';
                    }
                    skeleton += '</ol>';
                    $result_container.html(skeleton);
                } else {
                    $result_container.html('<a class="close" href="/">&times;</a><strong>No result!</strong>');
                }
            },
            error: function() {
                $result_container.html('<a class="close" href="/">&times;</a><strong>Error loading feed.</strong>');
            }
        });
        return false;
    });
    $form.on("click", ".close", function() {
        $result_container.fadeOut();
        return false;
    });
})(jQuery);
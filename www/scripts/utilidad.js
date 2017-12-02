var emailVal = function (email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }



    var $pushloader = jQuery(".pushloader");
    // $pushloader.hide();




    var preloader = "<div class='infinite-scroll-preloader wpreloader'>" +
                            "<div class='preloader'></div>" +
                        "</div>";

    function removePreloader() {
        $(".wpreloader").remove();

    }
    function showPreloader() {
        removePreloader();
        $(".infinit").append(preloader);
    }
    var itemsPerLoad = 0, lastIndex = 0, sourcePaging = [], source = [], lgSource = source.length, maxItems = 0;
    var t = "", scrollList = "", loading = false, itemsperTemps = itemsPerLoad;

    function refreshScroll(options) {

        // Append items per loads
        itemsPerLoad = options.ip, lastIndex = 0, sourcePaging = [], source = options.source, lgSource = source.length, maxItems = options.max;
        t = options.t, scrollList = options.scrollList;
        for (var i = 0; i < lgSource; i++) {
            if (i > (itemsPerLoad - 1)) {
                lastIndex = i;
                break;
            }
            var item = source[i];
            sourcePaging.push(item);
        }
        //lastIndex=lastIndex + 1;
        apcopy.template.render({
            s: scrollList,
            t: t,
            j: sourcePaging,
            bclear: true
        });
        //apcopy.template.render({
        //    s: ".contacts-list ul",
        //    t: "ps",
        //    j: sourcePaging
        //});
        // Loading flag
        loading = false;
        itemsperTemps = itemsPerLoad;
    }


    function infinitiveScroll(options) {
        refreshScroll(options);





        $(".infinite-scroll").scroll($.debounce(250, true, function () {
            if (waspulling)
                return;
            console.log('SCROLLING!');
        }));
        $(".infinite-scroll").scroll($.debounce(250, function () {
            if (waspulling)
                return;
            if (loading || sourcePaging.length < itemsPerLoad) {
                return;
            }
            showPreloader();
            // Exit, if loading in progress
            if (loading) return;
            if ((lastIndex) >= lgSource) {
                removePreloader();
                // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
                apcopy.f7.detachInfiniteScroll($$('.infinite-scroll'));
                // Remove preloader
                $$('.infinite-scroll-preloader').remove();
                return;
            }
            itemsperTemps = itemsperTemps + itemsperTemps;
            // Set loading flag
            loading = true;

            // Emulate 1s loading
            setTimeout(function () {
                // Reset loading flag
                loading = false;

                if (lastIndex >= maxItems) {
                    removePreloader();
                    //$wpreloader.hide();
                    // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
                    apcopy.f7.detachInfiniteScroll($$('.infinite-scroll'));
                    // Remove preloader
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }

                // Generate new items HTML
                var html = '';

                for (var it = lastIndex; it < lgSource; it++) {
                    lastIndex = it;
                    var j = source[it]
                    if (it > itemsperTemps)
                        break;
                    sourcePaging.push(j);

                }
                lastIndex = lastIndex + 1;
                apcopy.template.render({
                    s: scrollList,
                    t: t,
                    j: sourcePaging,
                    bclear: true
                });
                removePreloader();
                //// Append new items
                //$$('.list-block ul').append(html);
                //// Update last loaded index
                //lastIndex = $$('.list-block li').length;
            }, 3500);
            console.log('DONE!');
        }));


    }


    function infinitiveScroll2(options) {
        refreshScroll(options);
        // Attach 'infinite' event handler
        $$('.infinite-scroll').on('infinite', function () {
            showPreloader();
            if (loading || sourcePaging.length < itemsPerLoad) {
                return;
            }


            // Exit, if loading in progress
            if (loading) return;
            if ((lastIndex) >= lgSource) {
                removePreloader();
                // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
                apcopy.f7.detachInfiniteScroll($$('.infinite-scroll'));
                // Remove preloader
                $$('.infinite-scroll-preloader').remove();
                return;
            }
            itemsperTemps = itemsperTemps + itemsperTemps;
            // Set loading flag
            loading = true;

            // Emulate 1s loading
            setTimeout(function () {
                // Reset loading flag
                loading = false;

                if (lastIndex >= maxItems) {
                    //$wpreloader.hide();
                    // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
                    apcopy.f7.detachInfiniteScroll($$('.infinite-scroll'));
                    // Remove preloader
                    $$('.infinite-scroll-preloader').remove();
                    return;
                }

                // Generate new items HTML
                var html = '';

                for (var it = lastIndex; it < lgSource; it++) {
                    lastIndex = it;
                    var j = source[it]
                    if (it > itemsperTemps)
                        break;
                    sourcePaging.push(j);

                }
                lastIndex = lastIndex + 1;
                apcopy.template.render({
                    s: scrollList,
                    t: t,
                    j: sourcePaging,
                    bclear: true
                });
                removePreloader();
                //// Append new items
                //$$('.list-block ul').append(html);
                //// Update last loaded index
                //lastIndex = $$('.list-block li').length;
            }, 3500);
        });
    }

    var pathf;

    //var path = "http://forceserver.com/publicaciones/";
    //var path = "http://201.139.255.253/forceserver/publicaciones/";
    var path = "http://www.schoolapp-mx.com/theworkshop/publicaciones/";
    function getpublicacionestb(ps, type, pmodule) {
        var pbs = [];
        $.each(jQuery.parseJSON(ps), function (index, p) {
            var p2 = {
                texto: p.texto,
                tipo: type,
                pmodule:pmodule
            };
            $.extend(p, p2);
            var full = path + type + "/" + p.folder + "/thumb/";
            if (p.thumbai != "share.jpg")
                p.thumbai = full + p.thumbai;
            else
                p.thumbai = "img/" + p.thumbai;
            pbs.push(p);
        });
        return pbs;
    }


    function getPortada(ps, type) {
        var portada;
        var full = path + type + "/" + ps.folder + "/portada/resize/";
        if (ps.portada != "share.jpg")
            portada = full + ps.portada;
        else
            portada = "img/" + ps.portada
        return portada;
    }

    function getDateString(date) {
        var day = date.getDate(), mont = date.getMonth() + 1, year = date.getFullYear();
        day = day < 10 ? "0" + day : day;
        mont = mont < 10 ? "0" + mont : mont;
        return day + "/" + mont + "/" + year;
    }

    function getmultimediafull(publicaciones) {
        var ps = [];
        $(publicaciones).each(function (index, pub) {
            var images = getmultimedia(pub, "multimedia");
            if (images.length > 0) {
                var copy = {
                    audio: false,
                    video: false,
                    type: "",
                    fecha: getDateString(new Date(pub.fecha)),
                    titulo: pub.titulo,
                    portada: getPortada(pub, "multimedia")
                };
                var file = images[0];
                $.extend(file, copy);
                if (file.extension == ".mp3") {
                    file.audio = true;
                    file.type = "audio/mpeg";
                    ps.push(file);
                }
                else if (file.extension == ".wav") {
                    file.audio = true;
                    file.type = "audio/wav";
                    ps.push(file);
                }
                else if (file.extension == ".ogg") {
                    file.audio = true;
                    file.type = "audio/ogg";
                    ps.push(file);
                }
                else if (file.extension == ".mp4") {
                    file.video = true;
                    ps.push(file);
                }

            }

        });
        return ps;
    }

    function getmultimedia(p, type) {
        var images = [];
        pathf = path + type + "/" + p.folder + "/";
        if (p.images.length == 0) {
            return images;
            images.push({
                url: "img/share.jpg",
                caption: "share.jpg",
                extension: ".jpg"
            });
            return images;
        }
        $(p.images).each(function (index, img) {
            var image = {

                url: pathf + img.url,
                caption: img.caption,
                extension: img.extension
            };
            images.push(image);

        });
        return images;
    }



    function getImages(p, type, isFile) {
        var images = [];
        pathf = path + type + "/" + p.folder + "/";
        if (p.images.length == 0) {
            return images;
            images.push({
                url: "img/share.jpg",
                caption: "share.jpg",
                extension: ".jpg"
            });
            return images;
        }
        $(p.images).each(function (index, img) {
            var image = {

                url: pathf + img.url,
                caption: img.caption,
                extension: img.extension
            };

            if (isFile) {
                if (image.extension == ".pdf" || image.extension == ".docx" || image.extension == ".xlsx") {
                    image.urlImg = "img/" + image.extension.substring(1) + ".png";
                    images.push(image);
                }
            }
            else {
                if (image.extension == ".jpeg" || image.extension == ".jpg")
                    images.push(image);
            }
        });
        return images;
    }


    var utilidad= {
        validateEmail: emailVal,
        iScroll: infinitiveScroll,
        getpublicacionestb: getpublicacionestb,
        getImagesByPub: getImages,
        getPortada: getPortada,
        getmultimediafull: getmultimediafull,
        resetScroll: refreshScroll
    };
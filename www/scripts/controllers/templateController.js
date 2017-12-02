define(function () {

    /// renderiza un template de cualquier tipo al selector
    function renderTemplate(params) {
        var s = params.s, bf = params.bclear;
        var hbs = 'hbs!templates/' + params.t;
        require([hbs], function (t) {
            var j = params.j;
            if (bf) {
                $(s).empty();
                $$(s).html(t(j));
            }
            else
                $$(s).append(t(j));

            if (params.bindings)
                bindEvents(params.bindings);
        });

    }

    function bindEvents(bindings) {
        for (var i in bindings) {
            $$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
        }
    }

    return {
        render: renderTemplate
    };
})
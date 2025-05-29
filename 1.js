function filter_changed(){
    var list = document.getElementsByClassName("home");
    for (var i=0;i<list.length;i++)
        hide(list[i], is_filtred(list[i]));
}
function is_filtred(node){
    if (no_text(node, "style")) return true;
}
 
function no_text(node, filter){
    var style_filter = get(document.getElementById(filter),["value"]);
    var home_style = get(node.getElementsByClassName(filter),[0,"textContent"]);
    if (style_filter && (!home_style || (home_style.indexOf(style_filter)<0)))
        return true;
}

function hide(node, h){
    node.style.display = h?"none":"block";
}
function is_filtred(node){
    if (no_text(node, "style")) return true;
    if (compare(node, "square")) return true;
}
 
function compare(node, filter, comparer){
    var square_filter = get(document.getElementById(filter),["value"]);
    var home_square = get(node.getElementsByClassName(filter),[0,"textContent"]);
    if (square_filter && !home_square)
        return true;
    else if (square_filter && home_square){
        square_filter = parseFloat(square_filter)
        home_square = parseFloat(home_square)
        if ((!comparer||comparer==">")?square_filter > home_square:comparer=="<"?square_filter < home_square:comparer=="="?square_filter!=home_square:false)
            return true;
    }
}
function get(node, keys){
    for (var i=0; (i<keys.length) && node; i++)
            node = node[keys[i]];
    return node
}
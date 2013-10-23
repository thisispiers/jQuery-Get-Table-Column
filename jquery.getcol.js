(function($){

    $.fn.getCol = function(col){

        var options = $.extend({
            col: col
        });

        var col_cells = $([]);

        this.each(function(){
            var table_cols = new Array();
            var total_cols = -1; // colspan default is 1, so make this -1 to ensure the first column index cutoff is 0
            $(this).find('tr:first th').each(function(i){
                var colspan = $(this).prop('colspan'); // get colspan (if not set it defaults to 1 which is good)
                table_cols[i] = total_cols += colspan; // add the cutoff to array
            });
            table_cols.reverse(); // reversing table column index cutoffs means that when iterating <= will be true and overwrite the previous
            // reversing means that:
                //
            return $(this).find('tr th, tr td').each(function(j){
                var _this = $(this);
                var col = _this.parent().children().index(_this) * _this.prop('colspan'); // multiplying by colspan essentially sets the index to the last column used by this cell
                for(var k = 0, num_cols = table_cols.length - 1; k <= num_cols; k++){
                    if(k === num_cols){ // this is essentially the first column of the table
                        var next_cutoff = -1; // needed so that: col > next_cutoff
                    }
                    else { // any other column of the table
                        var next_cutoff = table_cols[k+1]; // get the next cutoff point
                    }

                    // subtract num_cols needed as the array is reversed, this then un-reverses it
                    // e.g. column 3 out of 7 is actually 4th out of 7 if they're reversed
                    if(col <= table_cols[k] && col > next_cutoff && Math.abs(k-num_cols) === options.col){
                        col_cells = col_cells.add(_this); // add it to the element collection
                    }
                }
            });

        });

        return col_cells;

    }

})(jQuery);

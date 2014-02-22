var principal = {
    win : null,
    _init : function(win) {
        this.win = win;
    },
    setUser : function(user) {
        principal.win.userLabel.setText(user);
    },
    retallaString : function(text) {
        try{
             var newText = text;
            if (text.length > 30) {
                newText = text.substring(0, 30);
            }
            return newText;
        }catch(error){
            return text;
        }
       
    }
}; 
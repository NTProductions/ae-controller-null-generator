// ae controller null generator
// generates based on selectedProperties
generateControllerNull(app.project.activeItem.selectedProperties);

function generateControllerNull(selectedProps) {
    app.beginUndoGroup("Generate Controller Null");
    
    var props = selectedProps;
    var comp = app.project.activeItem;

    var controllerNull = getLayerNamed(comp, "Controller Null");
    if(controllerNull == null) {
           controllerNull = comp.layers.addNull(comp.duration);
           controllerNull.name =  "Controller Null";
        }
    
    var thisEffect;
    for(var i = 0; i < props.length; i++) {
        thisEffect = controllerNull.Effects.addProperty("ADBE Slider Control");
        thisEffect.name = props[i].name;
        props[i].expression = 'thisComp.layer("Controller Null").effect("'+thisEffect.name+'").property("Slider")';
        }
    
    app.endUndoGroup();
    }

function getLayerNamed(comp, name) {
    for(var i = 1; i <= comp.numLayers; i++) {
        if(comp.layer(i).name == name) {
            return comp.layer(i);
            }
        }
    return null;
    }
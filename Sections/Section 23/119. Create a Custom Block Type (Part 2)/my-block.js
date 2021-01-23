/**
 * a function to register a new block type for the gutenberg editor.
 * @param name brad is the namespace and border-box is the name, so if there is another plugin named border-box they wont clash.
 * @param object
 */
wp-blocks.registerBlockType('brad/border-box', {
  //title of the custom block in the gutenberg selector
  title: 'My Cool Border Box',
  //icon of the custom block(same as dashicons)
  icon: 'smiley',
  //where you will find the custom block in the list.
  category: 'text',
  //what attributes the block owns
  attributes: {
    //which are a textbox
    content: {type: 'string'},
    //and a color picker tool
    color: {type: 'string'}
  },
  edit: (props) => {
    //function that takes the values from the input boxes and sets them to props
    function updateContent(event) {
      props.setAttributes({content: event.target.value})
    }

    //function that takes the values from the input boxes and sets them to props
    function updateColor(value) {
      //sets the value of the color to a hex value
      props.setAttributes({color: value.hex})
    }
    // react frontend stuff for the edit window of the custom block
    return wp.element.createElement(
      "div",
      null,
      wp.element.createElement(
       "h3",
       null,
       "Your Cool Border box", 
      ),
      // text input box, takes in value from the props of attributes.content here above, runs the function above onchange
      //this saves the input
      wp.element.createElement("input", { type: "text", value: props.attributes.content, onChange: updateContent }),
      // color input box, writes out the wp ColorPicker, sets the value in the color attribute above, runs the function above on change and complete
      wp.element.createElement(wp.components.ColorPicker, { color: props.attributes.color, onChangeComplete: updateColor })
    )
  },
  save: (props) => {
    return wp.element.createElement(
      "h3",
      { style: { border: "5px solid " + props.attributes.color } },
      props.attributes.content
    )
  }
})
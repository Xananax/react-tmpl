# React-TMPL

I found myself repeating the same stuff over and over again when creating React templates. This is an attempt at abstracting a bunch of the boilerplate.

## What is a template?

The way I work, React components can be separated in two types:
- Functional
- Representational
Yes, I know this is kind of a throwback to MVC (or at least VC), but there isn't really another way to obtain the following benefits:
- Switch your templates for React-Native
- Offer modules that can be seamlessly integrated with material-ui or bootstrap with minimal effort
- not write a lot of boilerplate to pass down presentational options from components to nested components. I want class names to be concatenated, styles to be merged, recursively and without writing anything.


# How it works

just use `template(renderFunction,defaultProps)`

```js
import tmpl from 'react-tmpl';

tmpl(
	function Button(props){
		if(props.action){
			props.onClick = props.action;
		}
		return (<button {...props} key={key}>{props.text}{this.getTime()}</button>);
	}
,	{
		propTypes:['text']
	,	type:'primary'
	,	className:'button'
	,	getTime(){
			return new Date();
		}
	}
)
```
Now you can use `template.Button`.
Any property (that is not a function) given in the object will be a defaultProp.

Special keys:
- `state` will be the initial state
- `style` will be recursively merged
- `css` will be recusiverly merged IF the prop `includeCSS` is `true` (which allows to develop inline styles, then export them to css)
- `className` will be recursively merged. In your render template, they will be automatically converted to a string through [classnames](https://github.com/JedWatson/classnames)
- `propTypes` will become the Component's `propTypes`, and can be an array of keys (in which case, they will all default to `PropTypes.any.isRequired`). You are also free to pass in a regular propTypes object.
- `name` will be used as `displayName`, and will override the function name (if there was one). Note that `name` is required.
- `buildLocals` is a function you can use to pre-process the locals.
- `initialize` is a constructor function to set properties you need

Additionally:

Any property that is a function will be added to the template's prototype, making it available in the render function
Any property that begins with `on`, such as `onResize`, `onClick` and so on, will be scoped to the current object automatically (good old magic)


Any property that begins with a capital letter will:
- create a method of the same name on the object
- be considered a template's options, thus overriding the default template options.

Consider the following Component:

```js
tmpl(
	function CloseButton(props){
		return this.Button({type:'secondary'})
	}
,	{
		Button:{
			text:'×'
		}
	,	classname:'close'
	}
)
```

This component does several things:
- `this.Button()` calls the `Button` template (or throws if `Button` was not defined)
- it will merge the props given in the render function (`{type:'secondary'}`) with the default defined props (`{text:'×'}`)
- it will merge *those* props with the `Button` template default props (`type` and `getTime`)
- the final button will have the classes `button close`.

Should you want to override this default behavior, make `Button` a function:

```js
tmpl(
	function CloseButton(props){
		return this.Button({type:'secondary'})
	}
,	{
		Button(givenProps){
			const props = this.locals;
			// `givenProps` is what is passed in the render function
			// `locals` is the full object passed to the render function
		}
	}
)
```

template offers a helper to get data from the current locals:
`prop(predicate)`, where predicate can be either a string, or a function.
Here's how you would use it:

```js
import tmpl,{prop} from 'react-tmpl'
var ids = 0;
tmpl(
	function CloseButton(props){
		return this.Button({type:'secondary'})
	}
,	{
		initialize(props){
			// here, `props` is what is natively passed to the component
			this.id = ids++
		}
	,	buildLocals(props){
			props.id = this.slug(props.text+this.id);
			return props;
		}
	,	slug(text){
			return text.replace(/[\s*&%$#]/g,'-');
		}
	,	text:prop((locals)=>locals.mini?'×':'close')
	,	Button:{
			text:prop('text')
		,	id:prop('slug')
		}
	}
)
```

One last thing to know is that you can namespace your templates:

```js
import {createTemplates} from 'react-tmpl'
const template = createTemplates();

template(/**...use it as usual**/)
```

# Install

```sh
npm install react-tmpl
```

# TODO

- Better documentation
- Tests
- Find a way to extract `css` to a stylesheet

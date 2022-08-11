
import React from 'react';
import './index.scss';
import Text from './Text'
import Wysiwyg from './Wysiwyg';
import Group from './Group';


function Fields({ data, fieldChanged, values }) {
    return (
        <>
            {
                data.map((field, i) => {
                    return (
                        <div key={i} className="fieldset">
                            {(() => {
                                switch (field.type) {
                                case 'text':
                                    return <Text field={field} fieldChanged={fieldChanged} value={values[field.id]} />;
                                case 'wysiwyg':
                                    return <Wysiwyg field={field} fieldChanged={fieldChanged} value={values[field.id]} />;
                                case 'group':
                                    return <Group field={field} fieldChanged={fieldChanged} value={values[field.id]} />;
                                default:
                                    return null;
                                }
                            })()}
                            {/* {field.type == 'text' ? <Text field={field} fieldChanged={fieldChanged}
                                value={values[field.id]} /> : ''}
                            {field.type == 'wysiwyg' ? <Wysiwyg field={field} fieldChanged={fieldChanged}
                                value={values[field.id]} /> : ''} */}
                        </div>
                    );
                })
            }
        </>
    );
}

export default Fields;
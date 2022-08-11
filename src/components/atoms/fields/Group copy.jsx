import React, { useState, useEffect } from 'react';
import Fields from './index';
import Icons from '../icons';

export default function Group({ field, fieldChanged, value }) {
    let groupvalue = value ? JSON.parse(value) : {}
    let groupLength = groupvalue['group-length'] ?? 1;

    const [GroupCount, setGroupCount] = useState(groupLength);
    const [groupValues, setGroupValues] = useState(groupvalue);
    const [NewGroupFields, setNewGroupFields] = useState([]);

    const updateFieldId = (data, itmno) => {
        return data.map((obj, i) => {
            let itemCount = itmno - 1;
            let newId = obj.id + '[' + itemCount + ']';
            return {
                ...obj,
                id: newId,
            }
        })
    }
    let groupFields = updateFieldId(field.fields, GroupCount);

    const fieldChangedGroup = (fieldId, value) => {
        setGroupValues(currentValues => {
            currentValues["group-length"] = GroupCount;
            currentValues[fieldId] = value;
            // console.log(groupValues)
            const finalobj = JSON.stringify(groupValues)
            return (
                fieldChanged(field.id, finalobj),
                currentValues
            )
        });

    };


    useEffect(() => {
        if (groupLength > 1) {
            setGroupCount(groupLength)
            setNewGroupFields([...NewGroupFields, existingGroupFields])
        } else {
            setNewGroupFields([...NewGroupFields, NewGroupField])
            setGroupCount(1)
        }
        setGroupCount(GroupCount + 1)
    }, [])


    const handleOnAdd = async (e) => {
        setGroupCount(GroupCount + 1)
        fieldChangedGroup('group-length', GroupCount)
        e.preventDefault();
        setNewGroupFields([...NewGroupFields, NewGroupField])
        // console.log(GroupCount)
    }


    const handleOnRemove = (e) => {

        setGroupCount(GroupCount - 1)
        fieldChangedGroup('group-length', GroupCount)
        e.preventDefault();
        // setNewGroupFields([...NewGroupFields, NewGroupField])

        // console.log(NewGroupFields)
        // console.log(GroupCount)


        const targetCollapseBtn = e.target.closest('.fieldset__group-remove');
        let removeId = targetCollapseBtn.getAttribute('data-ids');
        for (let i = removeId - 1; i < GroupCount+1; i++) {
            if (i == removeId) {
                let remGroupFields = updateFieldId(field.fields, i);
                let chGroupFields = updateFieldId(field.fields, i+1);
                let flen = remGroupFields.length
                for (let j = 0; j < flen; j++) {
                    let rf = remGroupFields[j].id
                    let rff = chGroupFields[j].id
                    if (groupValues[rff]){
                        groupValues[rf] = groupValues[rff]
                    }else{
                        delete groupValues[rf]
                    } 
                }
                removeId++;
            }
        }
        // console.log(groupValues)
        // console.log(GroupCount)
        // setGroupCount(GroupCount - 1)
        console.log(GroupCount)
        setGroupValues(groupValues)
        console.log(groupValues)
    }


    let NewGroupField =
    <div className="fieldset__group-wrapper">
        <div className="fieldset__group-header">
            <button onClick={handleOnRemove} className="fieldset__group-remove" data-ids={GroupCount}><Icons title="dashicons:no-alt" class="close-group" /></button>
            {field.name + ' ' + GroupCount}
        </div>
        <Fields data={groupFields} fieldChanged={fieldChangedGroup} values={groupvalue} />
    </div>

let existingGroupFields = [{}]
let count;
for (let i = 0; i < groupLength; i++) {
    count = i + 1
    groupFields = updateFieldId(field.fields, count);
    existingGroupFields[i] =
        <div key={i} className="fieldset__group-wrapper">
            <div className="fieldset__group-header">
                <button onClick={handleOnRemove} className="fieldset__group-remove" data-ids={count}><Icons title="dashicons:no-alt" class="close-group" /></button>
                <div className="fieldset__group-title">{field.name + ' ' + count}</div>
            </div>
            <Fields data={groupFields} fieldChanged={fieldChangedGroup} values={groupvalue} />
        </div>
}


    return (
        <>
            <div className="fieldset__group">
                {/* {groupLength != 0 ? existingGroupFields.map((existingGroupField, i) => {
                    return (
                        <div key={i}>
                            {existingGroupField}
                        </div>
                    );
                }
                ) : ''} */}
                {NewGroupFields.map((NewGroupField, i) => {
                    return (
                        <div key={i}>
                            
                            {NewGroupField}
                        </div>
                    );
                }
                )}
                <div className='fieldset__group-add-row'>

                    <button key={NewGroupField} onClick={handleOnAdd}>Add Group</button>
                </div>
            </div>
        </>
    );
}
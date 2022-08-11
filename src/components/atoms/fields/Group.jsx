import React, { useState, useEffect } from 'react';
import Fields from './index';
import Icons from '../icons';

export default function Group({ field, fieldChanged, value }) {
    let groupValue = value ? JSON.parse(value) : {}
    let groupLength = groupValue['group-length'] > 0 ? groupValue['group-length'] : 1;
    const [GroupCounts, setGroupCounts] = useState(groupLength);
    const [GroupValues, setGroupValues] = useState(groupValue);
    const [GroupFields, setGroupFields] = useState([]);

    let fieldChangedGroup = (fieldId, value) => {
        setGroupValues(currentValues => {
            currentValues["group-length"] = GroupCounts;
            currentValues[fieldId] = value;
            const finalobj = JSON.stringify(GroupValues)
            return (
                fieldChanged(field.id, finalobj),
                currentValues
            )
        });
    };

    let updateFieldId = (data, itmno) => {
        return data.map((obj, i) => {
            let itemCount = itmno - 1;
            let newId = obj.id + '[' + itemCount + ']';
            return {
                ...obj,
                id: newId,
            }
        })
    }

    const handleOnAdd = async (e) => {
        e.preventDefault();
        let count = GroupCounts
        count++;
        setGroupCounts(count)
        fieldChangedGroup('group-length', count)
        let grfn = []
        grfn = groupFieldfunc(GroupCounts + 1)
        setGroupFields([...GroupFields, grfn])
    }


    const handleOnRemove = async (e) => {
        e.preventDefault();
        let countr = GroupCounts
        if (GroupCounts > 0) {
            countr--;
        }
        setGroupCounts(countr)
        fieldChangedGroup('group-length', countr)

        const targetCollapseBtn = e.target.closest('.fieldset__group-remove');
        let removeId = targetCollapseBtn.getAttribute('data-ids');

        for (let i = removeId - 1; i <= GroupCounts; i++) {
            if (i == removeId) {
                let remGroupFields = updateFieldId(field.fields, i);
                let chGroupFields = updateFieldId(field.fields, i + 1);
                let flen = remGroupFields.length
                for (let j = 0; j < flen; j++) {
                    let rf = remGroupFields[j].id
                    let rff = chGroupFields[j].id
                    if (GroupValues[rff]) {
                        GroupValues[rf] = GroupValues[rff]
                    } else {
                        delete GroupValues[rf]
                    }
                    if(removeId == 1 && GroupCounts == 1){
                        delete GroupValues[rf]
                    }
                    
                }
                removeId++;
            }
        }
    }





    let groupFieldfunc = (index) => {
        let groupFieldId = updateFieldId(field.fields, index);
        if(index == 0){
            index = 1
        }
        return (
            <div key={index} className="fieldset__group-wrapper">
                <div className="fieldset__group-header">
                    <button onClick={handleOnRemove} className="fieldset__group-remove" data-ids={index}><Icons title="dashicons:no-alt" class="close-group" /></button>
                    {field.name + ' ' + index}
                </div>
                <Fields data={groupFieldId} fieldChanged={fieldChangedGroup} values={GroupValues} />
            </div>
        )
    }

    let grf = []
    if (groupLength > 0) {
        for (let i = 1; i <= groupLength; i++) {
            grf[i] = groupFieldfunc(i)
        }
    } else {
        grf = groupFieldfunc(1)
    }

    useEffect(() => {
        let grf = []
        if (GroupCounts > 0) {
            for (let i = 1; i <= GroupCounts; i++) {
                grf[i] = groupFieldfunc(i)
            }
        } else {
            grf = groupFieldfunc(1)
        }
        setGroupFields([grf])
        // if (GroupCounts == 0){  
        //     setGroupCounts(1)  
        // }
    }, [GroupCounts])


    useEffect(() => {
        setGroupFields([grf])
        setGroupValues(groupValue)
    }, [])


    return (
        <>
            <div className="fieldset__group">
                {GroupFields.map((NewGroupField, i) => {
                    return (
                        <div key={NewGroupField + i} >
                            {NewGroupField}
                        </div>
                    );
                }
                )}
                <div className='fieldset__group-add-row'>

                    <button onClick={handleOnAdd}>Add Group</button>
                </div>
            </div>
        </>
    );

}
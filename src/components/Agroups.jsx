import { useEffect, useState } from 'react';
import AccountGroup from './groups/AccountGroup';
import axios from 'axios';
import LoadingScreen from './LoadingScreen';

const initialGroups = {
    "MVS": {
        "APORTACIONES A": ["301-000-000", "304-000-000"],
        "NUMERO FRIO": ["102-000-000", "103-000-000", "106-000-000", "114-000-000", "204-000-000", "307-000-000"],
        "GEN 32": ["106-000-000", "204-000-000", "307-000-000"],
        "DXC": ["106-000-000"],
        "DXP": ["204-000-000", "307-000-000"],
        "CARTERA": ["103-000-000"],
        "UTILIDAD REINVERTIDA": []
    },
    // ...otros grupos
};

const Agroups = () => {
    const [data, setData] = useState(null);
    const [groups, setGroups] = useState(null);
    const [groupsInit, setGroupsInit] = useState(null);
    const [multiplacators, setMultiplacators] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://ws.katalabs.mx/api/groups');
            const responseData = response.data;
            // console.log({
            //   groups: responseData
            // });

            console.log('first effect')
            
            setData(responseData);
            setGroups(Object.entries( responseData.groups ));
            setGroupsInit(responseData.groups );
            setMultiplacators(responseData.multiplicators);
          } catch (error) {
            console.error('Error fetching data', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }
    

    const addAccount = async (group, category, account) => {
        setLoading(true);
        const newGroups = { ...groupsInit };
        const newMultiplicators = { ...multiplacators };
        // console.log( newGroups[group], group, category, account, groups );
        // return;
        if( !newGroups[group][category].includes( account ) ) {
            newGroups[group][category].push(account);
            newMultiplicators[group][category][account] = {};
            newMultiplicators[group][category][account]['multiplicator'] = 1;
        
            try {
                const response = await axios.put('https://ws.katalabs.mx/api/groups', 
                    {
                        groups: newGroups,
                        multiplacators: newMultiplicators,
                    }
                );
                // setGroups(newGroups);
                console.log('BIEN 3', response.data)
            } catch (error) {
                console.error('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        }
        // const newGroups = { ...groups };
        // newGroups[group][category].push(account);
        // setGroups(newGroups);
    };

    const removeAccount = async (group, category, account) => {
        setLoading(true);
        const newGroups = { ...groupsInit };
        const newMultiplicators = { ...multiplacators };
        // console.log( newGroups[group], group, category, account, groups );
        // return;
        newGroups[group][category] = newGroups[group][category].filter(item => item !== account);
        
        try {
            const response = await axios.put('https://ws.katalabs.mx/api/groups', 
                {
                    groups: newGroups,
                    multiplacators: newMultiplicators,
                }
            );
            // setGroups(newGroups);
            console.log('BIEN 2', response.data)
          } catch (error) {
            console.error('Error fetching data', error);
          } finally {
            setLoading(false);
          }
        // const newGroups = { ...groups };
        // newGroups[group][category] = newGroups[group][category].filter(item => item !== account);
        // setGroups(newGroups);
    };

    const changePositive = async (group, category, account, positive) => {
        setLoading(true);
        const newMultiplicators= { ...multiplacators };
        newMultiplicators[group][category][account]['multiplicator'] = positive * -1;
        setMultiplacators(newMultiplicators);
        
        try {
            const response = await axios.post('https://ws.katalabs.mx/api/multiplicators', newMultiplicators);
            console.log('BIEN', response.data)
          } catch (error) {
            console.error('Error fetching data', error);
          } finally {
            setLoading(false);
          }
    };

    return (
        <div>
            {
                groups &&
                groups.map(group => {
                    return <>
                        {/* <h5>{ group[0] }</h5> */}
                        <AccountGroup
                            key={ group[0] }
                            group={ group[0] }
                            categories={ group[1] }
                            multiplacators={ multiplacators }
                            addAccount={ addAccount }
                            removeAccount={ removeAccount }
                            changePositive={ changePositive }
                        >

                        </AccountGroup>
                        <hr />
                    </>
                })
            }
            {/* {Object.keys(groups).map(group => (
                <AccountGroup
                    key={group}
                    group={group}
                    categories={groups[group]}
                    addAccount={addAccount}
                    removeAccount={removeAccount}
                />
            ))} */}
        </div>
    );
}

export default Agroups;

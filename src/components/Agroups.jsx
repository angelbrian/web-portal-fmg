import { useEffect, useState } from 'react';
import AccountGroup from './groups/AccountGroup';
import LoadingScreen from './LoadingScreen';
import { getGroups, postMultiplicators, updatedGroups } from '../services/apiService';

const Agroups = () => {
    const [data, setData] = useState(null);
    const [groups, setGroups] = useState(null);
    const [groupsInit, setGroupsInit] = useState(null);
    const [multiplacators, setMultiplacators] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getGroups();
            const responseData = response.data;
            
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

        if( !newGroups[group][category].includes( account ) ) {
            newGroups[group][category].push(account);
            newMultiplicators[group][category][account] = {};
            newMultiplicators[group][category][account]['multiplicator'] = 1;
        
            try {
                const response = await updatedGroups ( 
                    {
                        groups: newGroups,
                        multiplacators: newMultiplicators,
                    }
                );
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        }
        
    };

    const removeAccount = async (group, category, account) => {
        setLoading(true);
        const newGroups = { ...groupsInit };
        const newMultiplicators = { ...multiplacators };
        
        newGroups[group][category] = newGroups[group][category].filter(item => item !== account);
        
        try {
            const response = await updatedGroups ( 
                {
                    groups: newGroups,
                    multiplacators: newMultiplicators,
                }
            );
          } catch (error) {
            console.error('Error fetching data', error);
          } finally {
            setLoading(false);
          }
    };

    const changePositive = async (group, category, account, positive) => {
        setLoading(true);
        const newMultiplicators= { ...multiplacators };
        newMultiplicators[group][category][account]['multiplicator'] = positive * -1;
        setMultiplacators(newMultiplicators);
        
        try {
            const response = await postMultiplicators( newMultiplicators );
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
        </div>
    );
}

export default Agroups;

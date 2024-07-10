import { useState } from 'react';

const AccountCategory = ({ group, category, accounts, multiplacators, addAccount, removeAccount, changePositive }) => {
    const [newAccount, setNewAccount] = useState('');

    const handleAdd = () => {
        if (newAccount.trim()) {
            addAccount(group, category, newAccount);
            setNewAccount('');
        }
    };

    return (
        <div>
            <h3>{category}</h3>
            <ul>
                {
                    accounts.map(account => {
                        const positive = multiplacators[group][category][account]['multiplicator'];
                        const bg = (positive == 1 ? 'blue' : 'red');

                        return <li key={account}>
                            {account}
                            <button onClick={() => removeAccount(group, category, account)}>Eliminar</button>
                            <button style={{ color: 'white', backgroundColor: bg }} onClick={() => changePositive(group, category, account, positive)}>
                                {
                                    positive == 1 ?
                                    'POSITIVO' :
                                    'NEGATIVO'
                                }
                            </button>
                        </li>
                    })
                }
            </ul>
            <input 
                type="text" 
                value={newAccount} 
                onChange={(e) => setNewAccount(e.target.value)} 
                placeholder="Agregar cuenta"
            />
            <button onClick={handleAdd}>Agregar</button>
        </div>
    );
}

export default AccountCategory;

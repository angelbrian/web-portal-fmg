import AccountCategory from "./AccountCategory";


const AccountGroup = ({ group, categories, multiplacators, addAccount, removeAccount, changePositive }) => {
    
    return (
        <div>
            <h2>{group}</h2>
            {Object.keys(categories).map(category => (
                <AccountCategory 
                    key={ category }
                    group={ group }
                    category={ category }
                    accounts={ categories[category] }
                    multiplacators={ multiplacators }
                    addAccount={ addAccount }
                    removeAccount={ removeAccount }
                    changePositive={ changePositive }
                />
            ))}
        </div>
    );
}

export default AccountGroup;
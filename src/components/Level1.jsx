import { useState } from 'react';
import { colors } from '../../public/styles/colors';
import { Level2 } from './Level2';
import { formatCurrency } from '../helpers/formats';

export const Level1 = ({ dataInfo, name }) => {
    const { companies, months, groups, data, son } = dataInfo;
    const [open, setOpen] = useState({});
    const [accountsActive, setAccountsActive] = useState([]);
    let firstHead = '';

    const handleAccountsActive = (v) => {
        if (!accountsActive.includes(v)) {
            setAccountsActive([v, ...accountsActive]);
        }
    };
    
    return companies.map((company) => {
        const bg = colors()[company]['bg'];
        const color = colors()[company]['color'];
        return (
            <>
                <tr
                    className='my-other-step'
                    style={{ fontSize: '16px', borderBottom: '1px solid black' }}
                    onClick={() => setOpen({ ...open, [company]: !open[company] })}
                >
                    <td style={{ width: '50%' }}>
                        <table style={{ width: '100%', backgroundColor: 'gray', color: 'white' }}>
                            <tr>
                                <td style={{ width: '10%', backgroundColor: bg, color, textAlign: 'center' }}>
                                    {company}
                                </td>
                                <td style={{ width: '90%', backgroundColor: bg + '17' }}>
                                    {months.map((month) => {
                                        if (data[month] && data[month][company] && firstHead !== company) {
                                            const balance = data[month][company]['balance'];
                                            const agroup = groups[company].find((c) => c.name === name);
                                            if (agroup && balance) {
                                                firstHead = company;
                                                return (
                                                    <HeadLevel1
                                                        key={month}
                                                        balance={balance}
                                                        agroup={agroup}
                                                        handleActive={handleAccountsActive}
                                                    />
                                                );
                                            }
                                        }
                                    })}
                                </td>
                            </tr>
                        </table>
                    </td>
                    {months.map((month) => {
                        if (data[month] && data[month][company]) {
                            const balance = data[month][company]['balance'];
                            const agroup = groups[company].find((c) => c.name === name);
                            if (agroup && balance) {
                                return (
                                    <DataLevel1
                                        key={month}
                                        balance={balance}
                                        agroup={agroup}
                                        bg={bg}
                                        color={color}
                                        accountsActive={accountsActive}
                                        name={name}
                                    />
                                );
                            }
                        }
                        return <td key={month} style={{ width: '10%' }}></td>;
                    })}
                </tr>
                {open[company] && <Level2 dataInfo={dataInfo} name={name} companyInit={company} />}
            </>
        );
    });
};

export const DataLevel1 = ({ agroup, balance, bg, color, accountsActive, name }) => {
    
    let sum = 0;
    // balance.map((b, index) => {
    //     const fBalanceAgroup = agroup['data'].includes(b['cuenta']);
    //     if (fBalanceAgroup) {
    //         sum += Math.round(b['saldo-final']);
    //         return (
    //             <tr key={index}>
    //                 <td className='t-r padding-custom'>{formatCurrency(b['saldo-final'])}</td>
    //             </tr>
    //         );
    //     } else if (accountsActive.includes(b['cuenta'])) {

    //         return (
    //             <tr key={index}>
    //                 <td className='t-r padding-custom'>lskdcowkdc</td>
    //             </tr>
    //         );
    //     }
    // })

    return (
        <td style={{ width: '10%', backgroundColor: bg, color }}>
            <table>
                <tbody>
                    {
                        accountsActive.map(( v ) => {
                            // let sum = 0;
                            const validAgroup = balance.find(( a ) => { return a.cuenta === v; })
                            const fBalanceAgroup = agroup['data'].includes( v );
                            let vB = false;
                            
                            return balance.map(( b, index ) => {
                                
                                const isLast = index === balance.length - 1;
                                if (!validAgroup && fBalanceAgroup && !vB) {
                                    console.log({v})
                                    vB = true;
                                    return <tr>
                                        <td className='t-r padding-custom'>------</td>
                                    </tr>
                                }

                                if (b['cuenta'] === v) {
                                    let mSum = 1;
                                    if (b['cuenta'] === '307-000-000' && (name === 'NUMERO FRIO' || name === 'GEN 32')) {
                                        mSum = -1;
                                    }
                                    sum += (b['saldo-final'] * mSum);
                                    const fSF = formatCurrency( (b['saldo-final'] * mSum) );
                                    let vReturn = <tr>
                                                        <td className='t-r padding-custom'>{ fSF == 0 ? '------' : fSF  }</td>
                                                    </tr>;
                                    // let vReturnFinal = <tr><td>{sum}</td></tr>;
                                    
                                    // return  isLast ? vReturnFinal : vReturn;
                                    return  vReturn;
                                    
                                }

                            })
                            // return  <tr>
                            //             <td className='t-r padding-custom'>{ v }</td>
                            //         </tr>
                        })
                        // balance.map((b, index) => {
                        //     const fBalanceAgroup = agroup['data'].includes(b['cuenta']);
                        //     console.log({accountsActive})
                        //     if (fBalanceAgroup) {
                        //         sum += Math.round(b['saldo-final']);
                        //         return (
                        //             <tr key={index}>
                        //                 <td className='t-r padding-custom'>{formatCurrency(b['saldo-final'])}</td>
                        //             </tr>
                        //         );
                        //     } else if (accountsActive.includes(b['cuenta'])) {
    
                        //         return (
                        //             <tr key={index}>
                        //                 <td className='t-r padding-custom'>lskdcowkdc</td>
                        //             </tr>
                        //         );
                        //     }
                        // })
                    }
                    <tr>
                        <td className='t-r padding-custom'>
                            <strong>{formatCurrency(sum)}</strong>
                        </td>
                    </tr>
                </tbody>
            </table>
        </td>
    );

};

// export const DataLevel1 = ({ agroup, balance, bg, color, accountsActive }) => {
//     let sum = 0;
//     return (
//         <td style={{ width: '10%', backgroundColor: bg, color }}>
//             <table>
//                 <tbody>
//                     {balance.map((b, index) => {
//                         const fBalanceAgroup = agroup['data'].includes(b['cuenta']);
//                         if (fBalanceAgroup) {
//                             sum += Math.round(b['saldo-final']);
//                             return (
//                                 <tr key={index}>
//                                     <td className='t-r padding-custom'>{formatCurrency(b['saldo-final'])}</td>
//                                 </tr>
//                             );
//                         } else if (accountsActive.includes(b['cuenta'])) {

//                             return (
//                                 <tr key={index}>
//                                     <td className='t-r padding-custom'>lskdcowkdc</td>
//                                 </tr>
//                             );
//                         }
//                     })}
//                     <tr>
//                         <td className='t-r padding-custom'>
//                             <strong>{formatCurrency(sum)}</strong>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//         </td>
//     );
// };

export const HeadLevel1 = ({ agroup, balance, handleActive }) => {
    return (
        <table>
            <tbody>
                {agroup['data'].map((b, index) => {
                    let name = '';
                    balance.forEach((e) => {

                        if (b === e.cuenta) {
                            name = e.nombre;
                            handleActive(b)
                        }

                    });
                    return (
                        <tr key={index}>
                            <td style={{ width: '100%', borderBottom: '1px solid white', fontWeight: 'bold' }}>
                                <table>
                                    <tr>
                                        <td className='padding-custom' style={{ width: '10%' }}>{b}</td>
                                        <td className='ellipsis' style={{ width: '90%' }}>{name}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    );
                })}
                <tr>
                    <td className='padding-custom' style={{ width: '100%', borderBottom: '1px solid white', fontWeight: 'bold' }}>
                        <strong>Total</strong>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

import { useState } from 'react';
import { Level1 } from './Level1';
import { formatCurrency } from '../helpers/formats';

export const Level0 = ({ dataInit, data, filter }) => {
    const { companies, months, groups } = data;
    console.log({ companies, months, groups })
    const reduceData = {};

    // Estado para controlar la visibilidad de Level1
    const [open, setOpen] = useState({});

    companies.forEach((company) => {
        const agroup = groups[company];
        if (agroup) {
            agroup.forEach((agroupItem) => {
                const agroupAccount = agroupItem['data'];
                const agroupName = agroupItem['name'];
                agroupAccount.forEach((element) => {
                    months.forEach(month => {
                        let nValuesTemp = [1, 2, 3];
                        if (data['data'][month]) {
                            if (data['data'][month][company]) {
                                nValuesTemp = data['data'][month][company]['balance'].filter((v) => {
                                    return v.cuenta === element;
                                });
                                if (!reduceData[agroupName]) {
                                    reduceData[agroupName] = {};
                                }
                                if (!reduceData[agroupName][month]) {
                                    reduceData[agroupName][month] = {};
                                }
                                if (!reduceData[agroupName][month][company]) {
                                    reduceData[agroupName][month][company] = [];
                                }
                                reduceData[agroupName][month][company] = [...reduceData[agroupName][month][company], ...nValuesTemp];
                            }
                        }
                    });
                });
            });
        }
    });

    const aReduceData = Object.entries(reduceData);

    return aReduceData.map(([name, accounts]) => (
        <>
            <tr className='my-first-step' key={name} style={{ borderBottom: '1px solid black', background: open[name] ? '#0A0A0A' : '', color: open[name] ? 'white' : '', fontSize: '18px' }} onClick={() => setOpen({ ...open, [name]: !open[name] })}>
                <td className='padding-custom'>{name}</td>
                {months.map((month) => {
                    if (accounts[month]) {
                        const monthOfAccount = Object.entries(accounts[month]);
                        let sumTotal = 0;
                        monthOfAccount.forEach(([company, balances]) => {
                            const sum = balances.reduce((accumulator, number) => {
                                // const mult = number.cuenta === '307-000-000' && (number.name === 'NUMERO FRIO' || number.name === 'GEN 32') ? -1 : 1;
                                const mult = 1;
                                return accumulator + number['saldo-final'] * mult;
                            }, 0);
                            // const oper = Math.round(sum / 1000);
                            sumTotal += sum;// oper;
                        });
                        return (
                            <td className='t-r padding-custom' key={month}>
                                <strong>{ formatCurrency( sumTotal ) == '0' ? '------' : formatCurrency( sumTotal ) }</strong>
                            </td>
                        );
                    }
                    return <td key={month}></td>;
                })}
            </tr>
            {/* {open[name] && <Level1 dataInfo={data} name={name} />} */}
            {open[name] && <Level1 dataInfo={dataInit} name={name} />}
        </>
    ));
};

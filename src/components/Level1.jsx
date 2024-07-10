import { useState } from 'react';
import { colors } from '../../public/styles/colors';
import { Level2 } from './Level2';
import { formatCurrency } from '../helpers/formats';

export const Level1 = ({ dataInfo, name }) => {
    const { companies, months, groups, data, multiplicators } = dataInfo;
    const [open, setOpen] = useState({});
    console.log({multiplicators})
    let firstHead = '';
    
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
                                        name={name}
                                        company={company}
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

export const DataLevel1 = ({ agroup, balance, bg, color, name, company }) => {
    let sum = 0;

    return (
        <td style={{ width: '10%', backgroundColor: bg, color }}>
            <table className='t-r'>
                <tbody>
                    {
                        agroup['data'].map(( v ) => {
                            const validAgroup = balance.find(( a ) => { return a.cuenta === v; });

                            if (validAgroup) {
                                sum += parseFloat( validAgroup['saldo-final'] );
                                return  <tr>
                                            <td className='t-r padding-custom'>
                                                { 
                                                    validAgroup['saldo-final'] != 0 ?
                                                    formatCurrency( validAgroup['saldo-final'] ) :
                                                    '------'
                                                }
                                            </td>
                                        </tr>
                            }
                            return <tr><td>------</td></tr>
                        })
                    }
                    <tr>
                        <td className='t-r padding-custom'>
                            <strong>
                                { formatCurrency( sum ) }
                            </strong>
                        </td>
                    </tr>
                </tbody>
            </table>
        </td>
    );

};

export const HeadLevel1 = ({ agroup, balance }) => {
    return (
        <table>
            <tbody>
                {agroup['data'].map((b, index) => {
                    let name = '';
                    balance.forEach((e) => {

                        if (b === e.cuenta) {
                            name = e.nombre;
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

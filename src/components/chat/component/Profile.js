import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { CardHeader } from '@mui/material'
import testImage from  "./../../../images/airbnb-logo.png" 
import { hover } from '@testing-library/user-event/dist/hover'


const depositData = [
    {
      logoWidth: 28,
      logoHeight: 29,
      amount: '+$4,650',
      subtitle: 'Sell UI Kit',
      title: 'Gumroad Account',
      logo: testImage
    },
    {
        logoWidth: 28,
        logoHeight: 29,
        amount: '+$4,650',
        subtitle: 'Sell UI Kit',
        title: 'Gumroad Account',
        logo: testImage
      },
      {
        logoWidth: 28,
        logoHeight: 29,
        amount: '+$4,650',
        subtitle: 'Sell UI Kit',
        title: 'Gumroad Account',
        logo: testImage
      },
]

const Profile = (props) => {



    return(
        <Card sx={{display: 'flex', justifyContent: 'space-between', flexDirection: ['column', 'column', 'row']}}>
            <Box sx={{ width: '100%' }}>
                <CardHeader
                    title='User'
                    sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
                    action={<Typography variant='caption'>View All</Typography>}
                    titleTypographyProps={{
                      variant: 'h6',
                      sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
                    }}
                />

                <CardContent sx={{ pb: theme=> `${theme.spacing(5.5)} !important`,
                    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)", 
                    '&:hover':{
                        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                        }
                    }} >
                    {depositData.map((item, index) => {
                        return (
                        <Box
                            key={item.title}
                            sx={{ display: 'flex', alignItems: 'center', mb: index !== depositData.length - 1 ? 6 : 0 , margin: 5}}
                          >
                            <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'center' }}>
                              <img src={item.logo} alt={item.title} width={item.logoWidth} height={item.logoHeight} />
                            </Box>
                            <Box
                              sx={{
                                ml: 4,
                                width: '100%',
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                              }}
                            >
                              <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.title}</Typography>
                                <Typography variant='caption'>{item.subtitle}</Typography>
                              </Box>
                              <Typography variant='subtitle2' sx={{ fontWeight: 600, color: 'success.main' }}>
                                {item.amount}
                              </Typography>
                            </Box>
                          </Box>
                        )
                    })}
                </CardContent>
            </Box>
        </Card>
    )


}

export default Profile;
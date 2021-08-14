import React, {useState} from 'react';
import Navi from './Navi';
import Slide from './Slide';
import './Home.css';
import {Container,Row,Col,Card} from 'react-bootstrap';
function Home(){
    return(
        <div>
<Navi></Navi>
<Slide></Slide>
<br></br>
<p>News</p>
<Container>
  
  <Row>
    <Col> 
    <Card>
    <Card.Img variant="top" src="data:image/jpeg;base64,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" />
    <Card.Body>
      <Card.Text>
      After a blowout of US NFP data, the test case on US inflation has come back again and the anxiety is jolting the global risk appetite. Traders are gravitating around the dollar as the market expects US CPI to rise by 3.6% in April, largest increase in almost a decade. 

If the inflation figure comes in line with market expectations then bets for a monetary tightening sooner than expected will push the USDINR spot prices even higher. But if it falls short of the forecast, then dollar will continue to remain subdued with a downside pressure on USDINR spot. 


      </Card.Text>
    </Card.Body>
  </Card>
  </Col>

    <Col>
    <Card>
    <Card.Img variant="top" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHAAcAMBEQACEQEDEQH/xAAcAAACAwADAQAAAAAAAAAAAAAFBgMEBwABAgj/xAA3EAABAwMDAgUDAgMIAwAAAAABAgMEAAURBhIhEzEHIkFRYRRxgRUyI5GhFjRCscHR4fEzYvD/xAAaAQACAwEBAAAAAAAAAAAAAAACBAEDBQAG/8QAMREAAgIBAwMCBAUDBQAAAAAAAQIAEQMEEiETMVEFQSIyYaEUcZHB4RVSgSNCYtHw/9oADAMBAAIRAxEAPwBI0urSqWFpkqHWLiSPqgOB8VYmz/dPPeoj1EsNnb/j+8VL79P+ryvotv0/UOzb2x8UB+k2dJ1OgnU+auZSQQFgqGQDyPepXuLjE3CTJ8OPpICXWYCvKNwbTyDt9a0qFntFTuv3iq5F0U/q5xSnWo1uZQlXS3fw3OPT5+Kgrg3WSLH6SQcm2X8eGcp8rJSwgOYx5hkAd8e1dWGvacOpBetY+im7GpWn3WVTd6doQskkevf4qrMuLpkir+kJN+4X2meCkZfNX0Zb9Jy7LFdnsQVPhg/UBxzzbt3B/lWpiRDjHAuKuWDRlVZNBgqPRtpSScHeODjkVPTH9og7m8mYZcksIuEpMU5jpeWGj7pycf0rNetxqNrdC5ZsjUJ2UgTXdnmG1JHlVz2JoIvqmyrjPTEe3LVpgNqOIu7BzhdWUlTzS6r1Hd7zNHQkOrDZygKO0/FVz1q3QuMVn0fcbk2t1e2MhJAy4O+aNULdpmar1bBpyB8x+kCXKIuBNeiOHKmlbSfehIriP4MozYxkHvK4rpbHe2eG1xuDNvdbmxAmb+0ckp4zTf4Q1ZMpOYXVSpctBXeFqFNmQEPOK/a8nhHbPPtQjSsaI7eYQygy494XajbdDaUxnMqCcpc9e/tU/hSfcSBlEoX3Qd6sVuXPmhjooICg2vJGfxQvp2Vd13JGUE1FUUvLI32PQNwvEKPKZlRUIkNKW2FEk+U4waaTSFlDXKmy0aqFUeEd7WpREmJ00nAXk88ZqTpeaLfaR1vpEKbGchSnor4AdZcKFgdsg4pVl2mjLVIIsTuFDkTXQ3GaU4rIHHpQwMuZMQ3OajKdCXJIOXY/HyaPpsJlD13Tn2MVHEKbcUhYwpKiCPmgmwCGFiFbdfbtbklMd9zYrB2rG4VIYjtFM+h02c268yhPkuzJTkmQrc64cqPzXd4xixJiQInYSuK6WTU7YrxHEWKuKw0WmkJU0FbOxGB61o/69c1Fz07lC7L19b5D9/ltlpasMuLb2qBA7HAJ9+9CTqF54/KcvT7Raa1pqJlSi3dXwVL3k5Byao/FZKqW9NZ5umrr5doSodwnKdYUQSkgDOKFs7sKM4Y1BuAqphxlsesr3ZYjceCpsstpUEBxrdjJyaZTUZAoWuJWyKTzCQ8StUh5a0uNAKPLYZO3OPvRdfJ/aP0MHpL5ibKkOSpDsh9W511ZWs+5JzSrEsbMtAoUJ6iypEVYXGeW0r3QcUMF8SZBTi4d/thfP2lxBI75b57VO9vMzv6Po+4H3i6tSlrUpZyokkn5qJpgBRQmnNat08lpIII8qQE9E+XH49Kv6ieJ5FvSdcWP/cQ9Sy4868yJEMYZWRtOMZ474qokE8T0mhxZMOnVMneCxURufQloakvWa3Fu8BppDDalpASCvHcH4xW2avtEz3M5PiRr/DdZTqFYjLWR/C2DGD6HFQe3aRzdmYrq60x7JfJECJIL7TeMKJBP24rKzIEehGkYsLMC1VDnYqJ01zSOstM23TcGJcHgZCGlJXiMSUE+mcc1pJmQIPiizoxbtDjfiJo1KAC8VKGMr+lV7d+1Scy388jpt4mK3uTHl3iZJiI2R3XlKbTjGAT7Vn5CGckRhAQoBhPT91t0MkPx9ilN7VOY3ZOfahFTO1ul1GX5Gvnt2jQNVWBKnElOST/5Az34+1Wb18TF/pWuIBv7zOpS0OSXltp2oUslI9hntVU9WgIQA949s+HrS2kqVPXu2AnCRjPrV4w/Wecb19gxASKWoraLTdHIaXeolGCFEYOD71Uw2mpt6LUnU4BlIq4MFRGpuWmLJahZbOZNvaLqAlT6zG5UnGeT6962lUhaHiJMfii/4m2D6m7dXTtpf6akJ80dOEH349+1L5cbsgofFDxsAxvtEuRpLUDIC5FrkpSpZTuV2yBk5P8ArSZwZQLIl4dSaEF3CGqE/wBJTiHPKDuQTilwQ0tZSpoyrUwY0aC00xqe5vRJD7zKUNbwttOcHOOfimcGJXvdAdto4j+jwatqtp/VZRBx/hT+fSrejjHmVdRpk18gC13aZAC94jvKQFH1ApTIu1isuRtygymgFS0pBAJOOTQSSaFxztei2pMFD8iUorUoghkggCjVLFzB1PrTY8hRV4HmJ8toMSXmQc9NZTn3waCbqNuQN5hONcb480RGkzVttJAIbJISB27VNn2ij6fRq1uqgnzB05yQ7JWqYpwv585c/dn5roziVFQDH2kArpZNztEvWStPRnWI0B0Ns4Q0SoKUMcEntWuQB3q4qwFyEXDXSQQNORgojJ/je/Ge9RubwP1kUvmLdy1fqT6n9JuTSGA6pwKSF5IBSRj/AFpfUZWQFSo5EuwqCwIMTL+x0nWlBe8KScH81mYu0azd7gmrJVCdiduzclYsi5IfU2d4YPJT65q7Ccl1jgttr4owFjXyEpc3XfaSkgh0nJxx61fWq/8AVK7xRRkl1T7hkFZe3nqFZyrd65pNrvnvLRVcSKokwvbmLyuMF276nob8DpL43fbNcLied9IHrLV/WC3QpLiw5neFEK3d8+tdG1ogbe0Z7JqaPAhPtKjdJxSQElhIAVj1PzRq1AzH1fpj5sisGsfX9oDvc0XG6PzEpKA8rISfTgCoJs3NLS4TgwrjPtKQqJfN0sU+xDT0LddJKCplO8KdUAlWPettWdgDUTcC4Stl702Zm6ZekZU1gb5RHAGQcZ70OQsBS1IUQfJToWWzJUZEJU51ayh5axvGeAc1XkXd3r7QkJWqmWX2IEW1twK3KQsbvj0/2rET5iJp5RxcW6ti8M6WvZsFzMwNF0FlbZQFYzuFX4MoxtZgOu4VHiN4sBiC3HFsVlsISgl70A5/NNfisW66Mq6TeZm9xk/WTpMrbt67ynNvtuJOKRyNuYmXqKFSuk7VBQ7g5oJJjPa9YSICf7qytRXuJHlBGMdqJWKzJ1HpCZj8xi9Mf+plPP7QkuLK9o9MmhmnjTYgTwI5WvTtndQx1llwOMb1OBzACs4/rViqt8mYOp9R1SltoqjVV7Rf1bbo1rvCo0MktbEqwTnBPpUMADQml6bqMmowB8neBqGPz6R0m47I0LZFNw2HAG2kErIAJHr2rUBF9/aKvdxd8QdIXXUctsRIsFvpNgFalYIOSTjAqMiK6UD/AJPeRjamiBc/D2722GuU49EXtUEhCHPMc/ilm0xVd1y9cm40BDDsFpxtyNJa8rvGRzj81l5Phc1NBRuWjFe+abTbI4eYlmR5uUdPBSPfuc1amQMalD4ioudaLh26dfUR7v8A3ZTS+SvbhWOOad0qq+SmEXyEhbE1NGltEtPtMrailK0N4Jfycn8090Vr5RF97eZkeq40OHqGfHtigqI28UtkHIx9/vms3MoVyBGMZJUEwUO4zwKqhxx07b9PvApkvBxXU4Lh2Z47Yol23zMHX6jXJygrj25ivc22mp8hEcgtJcIQR2xQzZwMzYlLd6hBjT17dR/Diu4CScbscZ7fzqdhMWf1DSL8zCUbrClwJZZnoUl7GTk5yPfNdVRjBmxZkDYjxKgrpdNs0czfRpOH9Leo7KEIC22ltApAIyMnOa2QgCLfevEUyH4pLNia5kymnl362suhGem2nAUPkHvQBXqgft/MgFb/AJgcuXJUqazfJceZ0TghsDbn2x/93pbVb6CsQRGtMQLIErMOF9Cjj7Vik2ZoDtIJBUFJVnBAzmhEmKytOSpl6TCgFCnH0F1IWdoA9RWhplbMaERy0nMMRvDC/wAphp9h2IptxKSFdQ8Z/FNnSkHlpR1R4ineLZIs9yfgTAkPsK2r2nI7ZBH4NK5EKNtMtVgwsSlQSYftWkrlcY/XQENJ3Yw5kH70SoWFiZmo9V0+B9h5/KB5sVyFKdjPY3tq2nFDH8WVcuMOvYxmg63kxUbRGbVyrGVnjJzRrkZZk5vRMWQ3ur/EC6gu671PEtxoNkICAkHPA/7qGYsbj+j0i6TF0wb94MFRG5q2jtX6Xt2noUGclaZiHApaygqANamPMoQfF7RZkJa6jFePEbSH1je1BkpUnapxLX7MGhXKqjl5HTJ9otXbU9lu0kptRUk7SVZb2b+aDPkx5F4NmX4FK8GVoExKlbQOKwyOZoiSTG1EKOOAM0MmK028yLZfWJkUp6jDeAFduc07pchx/EInnG41CMDxNv0FgMs/TdNKUpAKO2Pz6082sLclRF+iIr3q5SLxcpFwl7es+rcraMAcYGPwKVdy7WYartFSiO9BChu36nukBktNPBSSrPnGT9qkMR2iGf0zTZm3Mv6QVLkOS5Dkh4guOK3KwPWojmNFxoEXsIRtzNuU3mQvz7eQrjBzS2Zso+UTd0OHQMt5W5r3lS6IjolYi7entH7TkZqzCWK/FE/UFwrmrD2qUxVsRmuaemaFa0ZDTc2oSpoSOunALhO7+daeKto5FVFn3bpG5L0KdU2pcViK3E2rLiiR08+m8f5VYTjvkjd7TgH58Q1dbp4donLwiCtTyNgcYA8nB5yO1ACtUxFyBu9rihK/S4c0fpdzbmRljcMfua/9Vf7/AOVZWqwhDam5oYMhbvCiVddtCkjIxzSRjMCuNQLXqqHcpyQqI7lLqXE5CTtwCK0PT8oD00T1KGrEdP7VaERBSFpjqASnLaWOSAeB+K1DlW+GES2N4mU6zlQZupZ8m1ACG44C3hO3/CM8ffNZ+cg5CQbl+MELzAgqmHLsB+MypJkNFZCgcj2qrIrsPhMe0efBiN5UvmQSloW8tTYwkqJFGoIUAxfUMr5WZOxM8tMuPEhtO7AyfgVJYL3g48T5DSi53JYXGc2LKScZyk5GKhHDCxDz4GwNtb85EKKUTSNK6Q09c7AmTNlqEheMqSv9hPpj3rVx6XG2NTV2Iu+RgeJcV4W25DiGl3eR1FoKwkM+34oRo0Ivn7SOufERdUWuDaLguJBmmUUHClY4H/NK6jFjx0FPMtxuzCyIMiPdF9Kj+3OFfaljzLQaMeLPMU15CcilGWjHFNiELlBj3aMliQstoUoZcAyUc96nEwVwT2g5FJXiTRfCRqS0HEXglPv0vmts6XEPc/aZnWPiIGqrP+hXyTbt6lhojapQxuBGc0nmxjG1CW433LcE1VDlqDDMtWAtKQDg5PNVZMmwdo7o9G2pPBoSKS10X3G++04o0bcoMo1GLo5Wx+J0064yctqKcjBx61JUN3g48r4zaGp6kvrkLC3MZAwMCoRAooQ8+d87b3kQ70QlE0DSfiBCsdhatj9tU6pLm8up2575/nT+PUoqgG+JQ+NibEbHvGG3JlNrTaZ2AjAC0pBPt613UQDab/T+ZHTb6TIb3JM+7zZaWltiQ8pwIUOQCc0tlt3JAlqDaoErCJJKUKEd7av9h2Hzfb3oelk/tMKxGG0OqDKA4ClaDsUCMEEf8UvmQjvGMTWI2QiFtUrGIK1FctRw3U/QT5IiBABSnGG8fPtWlps+dl2r7RHNiQNu8xOuD78yS5KuEkvSHDlS85Jo3Fnc55gDgUJT4qniFO0EpOUkgj2qDRkglTYnFlRJKiST7104ksbMY9LS7FFkJXcmnCvYRuUApGftRoVB5mT6ji1mRKwkVf8AmR6zl26ZOZXbdpSG8LUlOAT6VzkE8QvS8WfFiIzeYvUE05omj9VWC16VVb7gypUsuFWQzuyM+9aOnzoiKCai+TGxawJe1FrnT0+6WmVGhLKYjhLhU3gge4HrRjU4geTf7QVxP+UKXTxN02t8rjW5T3VZCFlbIGPioTUYwKLGd0nvtPTfilp9qLb0ogu7mMFSekMJ4xxXHPjJa2PM442vtEu735jUGpJ82Mx0GnUpUhOO+3jJ+ef6UlqGXJdewjOAFO8rTLw4xtjsKIWf3Ed/xSSYS5qPjIifE3MB3CU44spLilD1yomn2AwjakTfIcrbjKFLwZyunT0munTijXTp/9k=" />
    <Card.Body>
      <Card.Text>
      Global indices provider MSCI (Morgan Stanley Capital International) will add six stocks to its India index, including Adani Enterprises and SBI Cards and Payment Services, and will remove Zee Entertainment Enterprises from the index, it said. The changes are part of its May 2021 semi-annual index review. Investors across the globe follow MSCIs indices, and international funds often construct their portfolios based on MSCI’s global indices. Earlier this year, MSCI tweaked its methodology for picking stocks that may be added to its indices.
      </Card.Text>
    </Card.Body>
  </Card>
  </Col>
    <Col> <Card>
    <Card.Img variant="top" src="data:image/jpeg;base64,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" />
    <Card.Body>
      <Card.Text>
      The Nifty50, after showing strength over the past few sessions, reacted to weak global cues on May 11 and closed with losses of nearly 100 points.

Although the selling was visible at higher levels above 14,900 where all the call writers were active, just ahead of the weekly expiry on Thursday, bulls helped the market limit the downfall.

 we remain cautiously positive on markets for May 12. The current consolidation appears to be a 4th wave consolidation on a shorter time frame where 14,775 and 14,715 are the immediate support levels for Nifty.
      </Card.Text>
    </Card.Body>
  </Card></Col>
  </Row>
</Container>

<br></br>
<br></br>
<Container fluid>
  <Row>
    <Col><Card body>Global Sales by Top Locations
    <br></br>
    <Card.Img variant="bottom" src="https://www.clipartkey.com/mpngs/m/201-2018849_small-simple-world-map.png" />
    </Card>
    
    </Col>
  </Row>
</Container>
        </div>
    )
}

export default Home;
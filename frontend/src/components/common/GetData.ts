import axios from 'axios'





async function getItems(){
    const token: any = localStorage.getItem('token');
    const config = {
      headers: { 'x-access-token': token }
    };
    let options: any = [];
    let items = await axios.get('/api/items/getItems',config).catch(e=>{return e.response.data});
    items.data.map((item: any)=>{
          let option={
            key:item.id,
            value: item.id,
            text: item.name
          }
          options.push(option)
        })
        return options;
}

async function getPaper(id: number){
  const token: any = localStorage.getItem('token');
  const config = {
    headers: { 'x-access-token': token }
  };
    let options: any = [];
    let papers = await axios.get(`/api/paper/getPaper/${id}`,config).catch(e=>{return e.response.data});
    papers.data.map((paper: any)=>{
        let option={
          key:paper.id,
          value: paper.id,
          text: paper.name
        }
        options.push(option)
      })
      return options;
}

async function getColor(id: number){
  const token: any = localStorage.getItem('token');
  const config = {
    headers: { 'x-access-token': token }
  };
    let options: any = [];
    let colors = await axios.get(`/api/color/getColors/${id}`,config).catch(e=>{return e.response.data});
    colors.data.map((color: any)=>{
        let option={
          key:color.id,
          value: color.id,
          text: color.name
        }
        options.push(option)
      })
      return options;
}

async function getDesign(){
  const token: any = localStorage.getItem('token');
  const config = {
    headers: { 'x-access-token': token }
  };
    let options: any = [];
    let designs = await axios.get('/api/design/getDesigns',config).catch(e=>{return e.response.data});
    designs.data.map((design: any)=>{
        let option={
          key:design.id,
          value: design.id,
          text: design.name
        }
        options.push(option)
      })
      return options;
}

async function getFont(){
  const token: any = localStorage.getItem('token');
  const config = {
    headers: { 'x-access-token': token }
  };
    let options: any = [];
    let fonts = await axios.get('/api/font/getFonts',config).catch(e=>{return e.response.data});
    fonts.data.map((font: any)=>{
        let option={
          key:font.id,
          value: font.id,
          text: font.name
        }
        options.push(option)
      })
      return options;
}

export{
    getItems,
    getPaper,
    getColor,
    getFont,
    getDesign
}
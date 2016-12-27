import views from 'co-views'
import path from 'path'

export default views(path.join(__dirname, '/../views'), {
  map: { html: 'swig' }
});
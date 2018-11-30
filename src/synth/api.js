import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

const apiUrl = 'http://localhost:4741'

export const apiSaveSetting = (params, user) => {
  return fetch(apiUrl + '/synth_settings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Token token=${user.token}`
    },
    body: JSON.stringify({
      synth_setting: {
        name: params.name,
        chorusrate: params.chorusrate,
        chorustoggle: params.chorustoggle,
        filtercutoff: params.filtercutoff,
        filtertoggle: params.filtertoggle
      }
    })
  })
}

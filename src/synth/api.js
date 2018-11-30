import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { handleErrors, signUp, signIn } from '../api'
import messages from '../messages'
import apiUrl from '../../apiConfig'


export const apiSaveSetting = params => {
  return fetch(apiUrl + '/synth_settings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      credentials: {
        name: params.name,
        chorusrate: params.chorusrate,
        chorustoggle: params.chorustoggle,
        filtercutoff: params.filtercutoff,
        filtertoggle: params.filtertoggle
      }
    })
  })
}

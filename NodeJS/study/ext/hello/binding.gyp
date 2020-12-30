{
  'targets': [
  {
    'target_name': 'hello',
      'source': [
        'src/hello.cc'
      ],
      'conditions': [
        ['OS == "win"',
        {
          'libraries': ['-lnode.lib']
        }
        ]
      ]
  }
  ]
}

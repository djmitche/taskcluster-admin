import editRole from './util/edit-role';
import {getProjects, hgmoPath, scmLevel, feature} from './util/projects';

module.exports.setup = (program) => {
  return program
    .command('make-parameterized-roles')
    .option('-n, --noop', 'Don\'t change roles, just show difference')
    .description('make the parameterized roles used by other roles');
};

module.exports.run = async function(options) {
  var description = desc => [
    '*DO NOT EDIT*',
    '',
    desc,
    '',
    'This role is configured automatically by [taskcluster-admin](https://github.com/taskcluster/taskcluster-admin).',
  ].join('\n');

  await editRole({
    roleId: 'project-admin:*',
    description: description('Scopes for administrators of projects; this gives complete control over everything related to the project.'),
    scopes: [
      'assume:hook-id:project-<..>/*',
      'assume:project:<..>:*',
      'auth:create-client:project/<..>/*',
      'auth:create-role:hook-id:project-<..>/*',
      'auth:create-role:project:<..>:*',
      'auth:delete-client:project/<..>/*',
      'auth:delete-role:hook-id:project-<..>/*',
      'auth:delete-role:project:<..>:*',
      'auth:disable-client:project/<..>/*',
      'auth:enable-client:project/<..>/*',
      'auth:reset-access-token:project/<..>/*',
      'auth:update-client:project/<..>/*',
      'auth:update-role:hook-id:project-<..>/*',
      'auth:update-role:project:<..>:*',
      'hooks:modify-hook:project-<..>/*',
      'hooks:trigger-hook:project-<..>/*',
      'index:insert-task:project.<..>.*',
      'project:<..>:*',
      'queue:get-artifact:project/<..>/*',
      'queue:route:index.project.<..>.*',
      'secrets:get:project/<..>/*',
      'secrets:set:project/<..>/*',
    ],
    noop: options.noop,
  });
};
